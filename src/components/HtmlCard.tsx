import React from 'react';

type HtmlCardProps = {
  name: string;
  description: string;
  start: string;
  end?: string;
  example: string;
};

const HtmlCard: React.FC<HtmlCardProps> = ({ name, description, start, end, example }) => {
  return (
    <div className="group [perspective:1000px] w-72 h-56">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        <div className="absolute w-full h-full rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md [backface-visibility:hidden]">
          <h2 className="text-xl font-bold dark:text-cyan-300">&lt;{name}&gt;</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">{description}</p>
          <pre className="mt-4 text-xs text-gray-500">
            {start}
            {end ? `...${end}` : ""}
          </pre>
        </div>


        <div className="absolute w-full h-full rounded-xl bg-gray-100 dark:bg-gray-900 p-4 shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: example }} />
          <p className="mt-2 text-xs text-gray-500">Пример</p>
        </div>
      </div>
    </div>
  );
};

export default HtmlCard;
