import Block from "./Block";

export default function compile(tmpl: (ctx: any) => string, props: any): DocumentFragment {
  const fragment = document.createElement("template");
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([name, value]) => {

    if (Array.isArray(value)) {

      for (let i = 0; i < value.length; i++) {
        if (value[i] instanceof Block) {
          components[value[i].id] = value[i];

          // eslint-disable-next-line no-param-reassign
          props[name][i] = `<div id="id-${value[i].id}"></div>`;
        }
      }
    }

    if (value instanceof Block) {
      components[value.id] = value;

      // eslint-disable-next-line no-param-reassign
      props[name] = `<div id="id-${value.id}"></div>`;
    }
  });

  fragment.innerHTML = tmpl(props);

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    if (!stub) {
      return;
    }

    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}
