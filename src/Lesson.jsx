import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import UserSettings from './UserSettings';
import Finished from './Finished';
import Flashcards from './Flashcards';
import CustomLessonSetup from './CustomLessonSetup';
import { shouldShowStroke } from './typey-type';

class Lesson extends Component {
  componentDidMount() {
    if (this.props.location.pathname.startsWith('/lessons/custom')) {
      this.props.setCustomLesson();
    } else if(this.isFlashcards()) {
      // do nothing
    } else if((this.props.lesson.path!==this.props.location.pathname+'lesson.txt') && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
    if (!this.props.firstVisit && this.mainHeading) {
      this.mainHeading.focus();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname.startsWith('/lessons/custom') && this.props.lesson.title !== "Custom") {
      this.props.setCustomLesson();
    } else if(this.isFlashcards()) {
      // do nothing
    } else if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/lessons'))) {
      this.props.handleLesson(process.env.PUBLIC_URL + this.props.location.pathname+'lesson.txt');
    }
  }

  isCustom() {
    return (this.props.location.pathname === '/lessons/custom');
  }
  isFlashcards() {
    return (this.props.location.pathname.startsWith('/lessons/') && this.props.location.pathname.endsWith('/flashcards'));
  }

  isSetup() {
    return (this.props.lesson.sourceMaterial.length !== 0);
  }

  isFinished() {
    return (this.props.currentPhraseID === this.props.lesson.presentedMaterial.length);
  }

  nextLessonPath() {
    let thisLesson = this.props.lesson.path;
    let suggestedNext = "/";
    let match = (el) => '/lessons'+el.path === thisLesson;
    let lessonIndexItem = this.props.lessonIndex.find(match);
    if (lessonIndexItem !== undefined) {
      if (lessonIndexItem.hasOwnProperty("suggestedNext")){
        suggestedNext = lessonIndexItem.suggestedNext;
      }
    }
    let nextLessonPath = '/lessons'+suggestedNext.replace(/lesson\.txt$/,'');
    return nextLessonPath;
  }

  prefillSurveyLink() {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
    let param = "&entry.1202724812&entry.936119214";
    let prefillLesson = '';
    if (this.props.location && this.props.location.pathname) {
      prefillLesson = this.props.location.pathname;
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param;
    }
  }

  render() {
    let createNewCustomLesson = '';
    let customMessage;
    let firstVisit;
    let strokeTip;
    let lessonSubTitle = '';
    if (this.props.lesson.subtitle.length > 0) {
      lessonSubTitle = ': '+this.props.lessonSubTitle;
    }

    if (this.isCustom() && this.isSetup()) {
      createNewCustomLesson = (<Link to='/lessons/custom' onClick={this.props.setCustomLesson} className="link-button link-button-ghost table-cell mr1" role="button">Create new lesson</Link>);
    } else {
      createNewCustomLesson = '';
    }

    if (this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }

    if (this.props.firstVisit) {
      firstVisit = (
        <div className='p3 pb0 mb0 mx-auto mw-1024'>
          <p className="mb0">Welcome to Typey&nbsp;type for stenographers. Type the words shown, including the first space.</p>
        </div>
      );
    } else {
      firstVisit = '';
    }

    let strokeTarget = this.props.targetStrokeCount + ' strokes';
    if (this.props.targetStrokeCount === 1) {
      strokeTarget = this.props.targetStrokeCount + ' stroke';
    }

    if (shouldShowStroke(this.props.showStrokesInLesson, this.props.userSettings.showStrokes, this.props.repetitionsRemaining, this.props.userSettings.hideStrokesOnLastRepetition)) {
      if (this.props.currentStroke) {
        strokeTip = <div className="stroke-tip"><span className="visually-hidden">Hint: </span><pre className="overflow-scroll mw-408"><span className="steno-stroke">{this.props.currentStroke.split('').map((item, i)=><kbd className="raw-steno-key" key={i}>{item}</kbd>)}</span></pre></div>;
      }
    } else {
      strokeTip = <div className="stroke-tip">
        <label className="mb0 text-small">
          <input
            className="checkbox-input visually-hidden"
            type="checkbox"
            name="showStrokesInLesson"
            id="showStrokesInLesson"
            checked={this.props.showStrokesInLesson}
            onChange={this.props.changeShowStrokesInLesson}
            />
          {strokeTarget} (hint?)
        </label>
      </div>;
    }

    if (this.props.lesson) {
      if (this.isFlashcards()) {
        return (
          <Flashcards
            fullscreen={this.props.fullscreen}
            changeFullscreen={this.props.changeFullscreen.bind(this)}
            lessonpath={process.env.PUBLIC_URL + this.props.location.pathname.replace(/flashcards/, '') + 'lesson.txt'}
            locationpathname={this.props.location.pathname}
          />
        )
      } else if (this.isCustom() && !this.isSetup()) {
        return (
          <CustomLessonSetup
            createCustomLesson={this.props.createCustomLesson}
          />
        )
      } else if (this.isFinished()) {
        return (
          <main id="main">
            <div className="subheader">
              <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                <div className="flex mr1">
                  <header className="flex items-baseline">
                    <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                      <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                    </a>
                  </header>
                </div>
                <div className="mxn2">
                  {createNewCustomLesson}
                  <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
                  <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button link-button-ghost table-cell" role="button">Stop</a>
                </div>
              </div>
            </div>
            <Finished
              actualText={this.props.actualText}
              changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
              changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
              changeUserSetting={this.props.changeUserSetting}
              chooseStudy={this.props.chooseStudy}
              currentLessonStrokes={this.props.currentLessonStrokes}
              disableUserSettings={this.props.disableUserSettings}
              handleLimitWordsChange={this.props.handleLimitWordsChange}
              handleRepetitionsChange={this.props.handleRepetitionsChange}
              hideOtherSettings={this.props.hideOtherSettings}
              suggestedNext={this.nextLessonPath()}
              lessonLength={this.props.lesson.presentedMaterial.length}
              path={this.props.path}
              prefillSurveyLink={this.prefillSurveyLink}
              restartLesson={this.props.restartLesson}
              settings={this.props.lesson.settings}
              timer={this.props.timer}
              toggleHideOtherSettings={this.props.toggleHideOtherSettings}
              charsPerWord={this.props.charsPerWord}
              totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
              totalWordCount={this.props.lesson.presentedMaterial.length}
              userSettings={this.props.userSettings}
            />
          </main>
        )
      } else {
        return (
          <main id="main">
            <div className="subheader">
              <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                <div className="flex mr1">
                  <header className="flex items-baseline">
                    <a href={this.props.path} onClick={this.props.restartLesson} className="heading-link table-cell mr2" role="button">
                      <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.lessonTitle}{lessonSubTitle}</h2>
                    </a>
                  </header>
                </div>
                <div className="mxn2">
                  {createNewCustomLesson}
                  <a href={this.props.path.replace(/lesson\.txt$/,'')} onClick={this.props.restartLesson} className="link-button link-button-ghost table-cell mr1" role="button">Restart</a>
                  <a href={this.props.path} onClick={this.props.handleStopLesson} className="link-button link-button-ghost table-cell" role="button">Stop</a>
                </div>
              </div>
            </div>
            <div>
              {firstVisit}
              <div role="complementary" className="mx-auto mw-1024">
                {customMessage}
              </div>
              <div className="lesson-wrapper mw-1024 p3">
                <UserSettings
                  changeUserSetting={this.props.changeUserSetting}
                  changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
                  changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
                  chooseStudy={this.props.chooseStudy}
                  disableUserSettings={this.props.disableUserSettings}
                  handleLimitWordsChange={this.props.handleLimitWordsChange}
                  handleRepetitionsChange={this.props.handleRepetitionsChange}
                  hideOtherSettings={this.props.hideOtherSettings}
                  toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                  totalWordCount={this.props.totalWordCount}
                  userSettings={this.props.userSettings}
                />
                <div role="article" className="lesson-canvas panel mw-568 p2 fill-fade-parent">
                  <span className="fill-fade-edges"></span>
                  <div className="mx-auto mw100 mt2 text-center">
                    <Material
                      actualText={this.props.actualText}
                      currentPhrase={this.props.currentPhrase}
                      currentStroke={this.props.currentStroke}
                      settings={this.props.settings}
                      userSettings={this.props.userSettings}
                      completedPhrases={this.props.completedPhrases}
                      upcomingPhrases={this.props.upcomingPhrases}
                    />
                    <TypedText
                      actualText={this.props.actualText}
                      currentPhrase={this.props.currentPhrase}
                      settings={this.props.settings}
                      updateMarkup={this.props.updateMarkup.bind(this)}
                      userSettings={this.props.userSettings}
                    />
                    <div aria-hidden="true">
                      {strokeTip}
                    </div>
                  </div>
                </div>
                <div className="visually-hidden">
                  <div role="status" aria-live="assertive">
                    <div className="material"><pre><span className="steno-material">{this.props.currentPhrase}</span></pre></div>
                    {strokeTip}
                  </div>
                </div>
                <div className="scores panel p2">
                  <Scores
                    timer={this.props.timer}
                    totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
                    totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                    totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                    totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                    totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                    totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                  />
                </div>
              </div>
              <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)}>Give feedback on this lesson (form opens in a new tab)</a></p>
            </div>
          </main>
        )
      }
    } else {
      return <div><h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That lesson is missing.</h2></div>;
    }
  }
}

export default Lesson;
