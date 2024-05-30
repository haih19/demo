import React, { useEffect, useRef, useState } from "react";
import { useVoyageEstimateStore } from "@/app/(dashboard)/estimate/store";
import { ATag } from "@/components/ui";
import { ATooltip } from "@/components/ui/atoms/a-tooltip/a-tooltip";
import { mapTagNameColor } from "@/core/utils";

type Props = {
  tags?: string[];
};

export const RenderTags = ({ tags }: Props) => {
  const [visibleTags, setVisibleTags] = useState<string[]>(tags ?? []);
  const [hiddenCount, setHiddenCount] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTextWidth = (text: string): number => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      return context.measureText(text).width + 60;
    }
    return 0;
  };

  useEffect(() => {
    const adjustTags = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let totalWidth = 0;
      const visible: string[] = [];
      const hidden: string[] = [];

      for (const tag of tags ?? []) {
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

  const { shipmentNameColorPair } = useVoyageEstimateStore((state) => state);

  return (
    <div
      ref={containerRef}
      className="flex w-[100px] justify-center overflow-hidden rounded-md  p-[5px]">
      {visibleTags?.map((tag) => (
        <ATag
          key={tag}
          className="tag-item"
          color={mapTagNameColor(shipmentNameColorPair, tag)}>
          {tag}
        </ATag>
      ))}
      {hiddenCount?.length > 0 && (
        <ATooltip
          title={
            <div className="flex w-[200px] flex-wrap gap-2.5">
              {hiddenCount?.map((item) => (
                <ATag
                  key={item}
                  className="tag-item mr-[5px] whitespace-nowrap"
                  color={mapTagNameColor(shipmentNameColorPair, item)}>
                  {item}
                </ATag>
              ))}
            </div>
          }>
          <ATag className="more-tag cursor-pointer border border-solid border-[#d9d9d9] bg-[#f0f0f0]">
            +{hiddenCount?.length}...
          </ATag>
        </ATooltip>
      )}
    </div>
  );
};
