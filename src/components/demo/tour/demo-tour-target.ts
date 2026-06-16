export function getDemoTourSelector(targetId: string) {
  return `[data-tour="${targetId}"]`;
}

export function getVisibleDemoTourTarget(...targetsIds: string[]) {
  if (typeof document === "undefined") {
    return null;
  }

  for (const targetId of targetsIds) {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(getDemoTourSelector(targetId)),
    );

    const visibleElement = elements.find(isElementVisible);
    if (visibleElement) {
      return visibleElement;
    }
  }

  return null;
}

function isElementVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden"
  );
}
