import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("build emits a Manifest V3 extension with a narrow permission", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../dist/manifest.json", import.meta.url), "utf8"),
  );

  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.permissions, ["activeTab"]);
  assert.equal(manifest.host_permissions, undefined);
  assert.equal(manifest.action.default_popup, "popup.html");
});

test("build emits the popup assets referenced by the manifest", async () => {
  const [html, script, stylesheet] = await Promise.all([
    readFile(new URL("../dist/popup.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/popup.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/popup.css", import.meta.url), "utf8"),
  ]);

  assert.match(html, /popup\.js/);
  assert.match(html, /popup\.css/);
  assert.match(script, /activeTab|active tab/i);
  assert.match(stylesheet, /button/);
});
