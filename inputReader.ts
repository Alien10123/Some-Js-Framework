const inputReader = (template: string) => {
  let i = 0;

  let peek = (k: number = 0) => {
    return template.charAt(i + k);
  };

  let consume = (k: number = 0) => {
    i = i + k;
    return template.charAt(i);
  };

  let peekBack = (k: number = 1) => {
    if (i - k < 0) {
      return null;
    } else {
      return template.charAt(i - k);
    }
  };

  let getCurrentPos = () => {
    return i;
  };

  return {
    peek,
    consume,
    peekBack,
	getCurrentPos
  };
};

export default inputReader;
