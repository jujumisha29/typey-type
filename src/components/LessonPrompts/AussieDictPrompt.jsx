import React from "react";
import { IconExternal } from "../Icon";
import { Tooltip } from "react-tippy";

export const missingAussieDict = (currentStroke, actualText) => {
  const untranslatedAussieSuffixRegex = new RegExp(/(A\*U|aw)/);
  return (
    (currentStroke.includes("/A*U ") ||
      currentStroke.includes("/A*U/") ||
      currentStroke.endsWith("/A*U")) &&
    actualText.match(untranslatedAussieSuffixRegex)
  );
};

export default function AussieDictPrompt({
  currentStroke,
  actualText,
  setAnnouncementMessage,
}) {
  const isMissingAussieDict = missingAussieDict(currentStroke, actualText);
  if (isMissingAussieDict) {
    return (
      <p>
        To use <span className="steno-stroke steno-stroke--subtle">/A*U</span>{" "}
        for Aussie spelling, add the{" "}
        <a
          href="https://github.com/didoesdigital/steno-dictionaries#australian-english-dictionaries"
          target="_blank"
          rel="noopener noreferrer"
        >
          dict-en-AU-with-extra-stroke.json dictionary
          <Tooltip
            title="Opens in a new tab"
            animation="shift"
            arrow="true"
            className=""
            duration="200"
            tabIndex="0"
            tag="span"
            theme="didoesdigital"
            trigger="mouseenter focus click"
            onShow={setAnnouncementMessage}
          >
            <IconExternal
              ariaHidden="true"
              role="presentation"
              iconWidth="24"
              iconHeight="24"
              className="ml1 svg-icon-wrapper svg-baseline"
              iconTitle=""
            />
          </Tooltip>
        </a>{" "}
        or fingerspell <span className="nowrap">this entry</span>.
      </p>
    );
  } else {
    return null;
  }
}
