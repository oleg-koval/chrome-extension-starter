export function displayPageTitle(title: string | undefined): string {
  const normalizedTitle = title?.trim();
  if (!normalizedTitle) {
    return "Untitled page";
  }
  return normalizedTitle;
}
