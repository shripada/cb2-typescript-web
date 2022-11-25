// Just placeholder code, need to be replaced with actual.
export function add(a: number, b: number): number {
  a = a + 1;
  return a + b;
}

// Just to demonstrate debug
add(2, 3);

interface DOMElement {
  id: string;
}
const applyButton: DOMElement = document.querySelector('.apply-btn');
