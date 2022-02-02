const proxyProps = new Proxy(props, {
  get(target, prop) {
    if (prop.indexOf('_') === 0) {
      throw new Error('Нет прав');
    }

    const value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },
  set(target, prop, val) {
    if (prop.indexOf('_') === 0) {
      throw new Error('Нет прав');
    } else {
      // eslint-disable-next-line no-param-reassign
      target[prop] = val;
    }
  },
  deleteProperty(target, prop) {
    if (prop.indexOf('_') === 0) {
      console.dir(new Error('Нет прав'));
    } else {
      if (target[prop]) {
        delete target[prop];

        return true;
      }
    }
  },
});
