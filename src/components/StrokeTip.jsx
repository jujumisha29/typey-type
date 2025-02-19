import React from "react";
import AmericanStenoDiagram from "./../StenoLayout/AmericanStenoDiagram";
import DanishStenoDiagram from "./../StenoLayout/DanishStenoDiagram";
import ItalianMichelaStenoDiagram from "./../StenoLayout/ItalianMichelaStenoDiagram";
import JapaneseStenoDiagram from "./../StenoLayout/JapaneseStenoDiagram";
import KoreanModernCStenoDiagram from "./../StenoLayout/KoreanModernCStenoDiagram";
import PalantypeDiagram from "./../StenoLayout/PalantypeDiagram";
import {
  shouldShowStroke,
  splitBriefsIntoStrokes,
  mapBriefToAmericanStenoKeys,
  mapBriefToDanishStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  mapBriefToKoreanModernCStenoKeys,
  mapBriefToPalantypeKeys,
} from "./../utils/typey-type";

export default function StrokeTip({
  changeShowStrokesInLesson,
  currentStroke,
  showStrokesInLesson,
  targetStrokeCount,
  userSettings,
  repetitionsRemaining,
}) {
  const isMultiline = userSettings.upcomingWordsLayout === "multiline";

  let strokeTip;
  if (
    shouldShowStroke(
      showStrokesInLesson,
      userSettings.showStrokes,
      repetitionsRemaining,
      userSettings.hideStrokesOnLastRepetition
    )
  ) {
    if (currentStroke) {
      let mapBriefsFunction = mapBriefToAmericanStenoKeys;
      let StenoLayoutDiagram = AmericanStenoDiagram;
      switch (userSettings.stenoLayout) {
        case "stenoLayoutAmericanSteno":
          mapBriefsFunction = mapBriefToAmericanStenoKeys;
          StenoLayoutDiagram = AmericanStenoDiagram;
          break;
        case "stenoLayoutDanishSteno":
          mapBriefsFunction = mapBriefToDanishStenoKeys;
          StenoLayoutDiagram = DanishStenoDiagram;
          break;
        case "stenoLayoutItalianMichelaSteno":
          mapBriefsFunction = mapBriefToItalianMichelaStenoKeys;
          StenoLayoutDiagram = ItalianMichelaStenoDiagram;
          break;
        case "stenoLayoutJapaneseSteno":
          mapBriefsFunction = mapBriefToJapaneseStenoKeys;
          StenoLayoutDiagram = JapaneseStenoDiagram;
          break;
        case "stenoLayoutKoreanModernCSteno":
          mapBriefsFunction = mapBriefToKoreanModernCStenoKeys;
          StenoLayoutDiagram = KoreanModernCStenoDiagram;
          break;
        case "stenoLayoutPalantype":
          mapBriefsFunction = mapBriefToPalantypeKeys;
          StenoLayoutDiagram = PalantypeDiagram;
          break;
        default:
          mapBriefsFunction = mapBriefToAmericanStenoKeys;
          StenoLayoutDiagram = AmericanStenoDiagram;
          break;
      }

      let layoutTypeStyle = "";
      if (userSettings.stenoLayout === "stenoLayoutKoreanModernCSteno") {
        layoutTypeStyle = " heavy-type-face--korean";
      }
      if (userSettings.stenoLayout === "stenoLayoutJapaneseSteno") {
        layoutTypeStyle = " type-face--japanese";
      }

      const diagramWidth = (userSettings.diagramSize || 1) * 140;

      strokeTip = (
        <div
          className={`stroke-tip${isMultiline ? " flex justify-center" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="visually-hidden"
            aria-hidden={userSettings.showStrokesAsDiagrams ? "true" : "false"}
          >
            Hint:{" "}
          </span>
          {userSettings.showStrokesAsDiagrams ? (
            <div className={`flex flex-wrap mr05${isMultiline ? " ml1" : ""}`}>
              {splitBriefsIntoStrokes(currentStroke).map(
                (strokeToDraw, index) => (
                  <React.Fragment key={index}>
                    {Object.values(mapBriefsFunction(strokeToDraw)).some(
                      (item) => item
                    ) && (
                      <div
                        className={`mt1 mr2${
                          isMultiline ? " flex flex-grow justify-center" : ""
                        }`}
                      >
                        <StenoLayoutDiagram
                          id={"diagramID-" + index + "-" + strokeToDraw}
                          {...mapBriefsFunction(strokeToDraw)}
                          brief={strokeToDraw}
                          diagramWidth={diagramWidth}
                        />
                      </div>
                    )}
                    {Object.values(mapBriefsFunction(strokeToDraw)).every(
                      (item) => !item
                    ) && (
                      <div
                        className={`mt1 mr2 unknown-steno-diagram${
                          isMultiline ? " flex flex-grow justify-center" : ""
                        }`}
                        aria-hidden={true}
                      >
                        <StenoLayoutDiagram
                          id={"diagramID-" + index + "-" + strokeToDraw}
                          {...mapBriefsFunction("")}
                          brief=""
                          diagramWidth={diagramWidth}
                        />
                      </div>
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          ) : (
            <div className={"db" + layoutTypeStyle}>
              <pre
                className={`overflow-auto mw-408 text-small${
                  isMultiline ? " flex" : ""
                }`}
              >
                <span
                  className="steno-stroke pa05 text-small"
                  aria-label={[...currentStroke].join(" ").replace("-", "dash")}
                >
                  {[...currentStroke].map((item, i) => (
                    <React.Fragment key={i}>{item}</React.Fragment>
                  ))}
                </span>
              </pre>
            </div>
          )}
        </div>
      );
    }
  } else {
    strokeTip = (
      <div
        className={`stroke-tip${
          isMultiline ? " flex justify-center min-h-88" : ""
        }`}
      >
        <label className="mb0 text-small color-interactive stroke-tip__label">
          <input
            className="checkbox-input visually-hidden"
            type="checkbox"
            name="showStrokesInLesson"
            id="showStrokesInLesson"
            checked={showStrokesInLesson}
            onChange={changeShowStrokesInLesson}
          />
          {`${targetStrokeCount} stroke${targetStrokeCount === 1 ? "" : "s"}`}{" "}
          (hint?)
        </label>
      </div>
    );
  }
  return <div className="mb6">{strokeTip}</div>;
}
