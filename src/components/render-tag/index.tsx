import React, { useState, useEffect, useRef } from "react";
import { Tag, Tooltip } from "antd";
import "./style.css"; // Import CSS tùy chỉnh

const TagsSelect: React.FC = () => {
  const [tags] = useState<string[]>(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]);

  const [visibleTags, setVisibleTags] = useState<string[]>(tags);
  const [hiddenCount, setHiddenCount] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustTags = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let totalWidth = 0;
      const visible: string[] = [];
      const hidden: string[] = [];

      for (const tag of tags) {
        const tagWidth = getTextWidth(tag);
        if (totalWidth + tagWidth < containerWidth) {
          totalWidth += tagWidth;
          visible.push(tag);
        } else {
          hidden.push(tag);
        }
      }

      setVisibleTags(visible);
      setHiddenCount(hidden);
    };

    adjustTags();
    window.addEventListener("resize", adjustTags);
    return () => {
      window.removeEventListener("resize", adjustTags);
    };
  }, [tags]);

  const getTextWidth = (text: string): number => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      return context.measureText(text).width + 60;
    }
    return 0;
  };

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden w-[60px] border border-solid border-[#d9d9d9] p-[5px] rounded-md">
      {visibleTags?.map((tag) => (
        <Tag className="tag-item">{tag}</Tag>
      ))}
      {hiddenCount?.length > 0 && (
        <Tooltip
          title={
            <div className="flex w-[200px] flex-wrap gap-2.5">
              {hiddenCount?.map((item) => (
                <Tag className="tag-item whitespace-nowrap mr-[5px]">
                  {item}
                </Tag>
              ))}
            </div>
          }>
          <Tag className="more-tag border border-solid cursor-pointer bg-[#f0f0f0] border-[#d9d9d9]">
            +{hiddenCount?.length}...
          </Tag>
        </Tooltip>
      )}
    </div>
  );
};

export default TagsSelect;
