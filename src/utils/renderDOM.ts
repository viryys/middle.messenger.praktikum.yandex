import Block from "./Block";

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error("Root not found");
  }

  root.innerHTML = "";

  root.appendChild(block.getContent());

  return root;
}
