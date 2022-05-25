import React, { MutableRefObject, useLayoutEffect, useState } from 'react';

interface IProps {
  children: React.ReactChild;
}

const StringRevealer: React.ForwardRefRenderFunction<HTMLDivElement | null, IProps> = (
  props,
  ref
) => {
  const [output, setOutput] = useState<string>('');
  const { children } = props;

  useLayoutEffect(() => {
    console.log(ref);
    if (ref && (ref as MutableRefObject<HTMLDivElement>).current) {
      const reference = (ref as MutableRefObject<HTMLDivElement>).current;
      const width = reference.offsetWidth;
      const trimUntil = width / 10;
      const stringToTrim = children as string;
      if (stringToTrim.length <= trimUntil) {
        setOutput(stringToTrim);
      } else {
        setOutput(`${(children as string).slice(0, width / 10)}...`);
      }
    }
  }, [ref, children, window.innerWidth]);

  return <>{output}</>;
};

export default React.forwardRef(StringRevealer);
