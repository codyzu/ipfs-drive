import React from 'react';

// Inspired from https://stackoverflow.com/a/42901044
// eslint-disable-next-line react/prop-types
export default function Cid({cid}) {
  const text = cid.toString();
  const prefix = text.slice(0, -8);
  const postfix = text.slice(-8);
  return (
    <div className="flex flex-row flex-nowrap font-mono">
      <div className="text-ellipsis max-w-full flex-shrink whitespace-nowrap overflow-hidden">
        {prefix}
      </div>
      <div>{postfix}</div>
    </div>
  );
}
