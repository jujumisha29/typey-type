import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import { Link } from 'react-router-dom';

function hashToQuery (hash) {
  if (hash.includes(":~:text")) {
    const trimmedHashText = hash.replace(":~:text=", "");
    if (trimmedHashText.includes(encodeURIComponent("How long"))) {
      return "#time-to-learn"
    }
  }

  return hash
}

class Support extends Component {
  componentDidMount() {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 0) {
        try {
          const el = document.querySelector(hashToQuery(hash));
          let top = 0;
          if (el && el.getBoundingClientRect().top) {
            top = el.getBoundingClientRect().top;
          }
          let scrollOptions = {
            left: 0,
            top: window.pageYOffset + top,
            behavior: 'smooth'
          }
          if (el) {
            window.scrollTo(scrollOptions);
            window.setTimeout(function ()
            {
              el.focus();
            }, 1000);
          }
        }
        catch (error) {
          console.error(error);
        }
      }
    };
    scrollToAnchor();

    window.onhashchange = scrollToAnchor;

    if (this.mainHeading && !window.location.hash) {
      this.mainHeading.focus();
    }
  }

  render() {
    const dictionaryEntryForTabSpace = '"STA*PB": "{#Tab}{#space}",';
    const dictionaryEntryForWinNextLessonAccessKey = '"HR*FPB": "{#alt(shift(o))}",';
    const dictionaryEntryForMacNextLessonAccessKey = '"HR*FPB": "{#control(option(o))}",';
    const dictionaryEntryForWinRestartAccessKey = '"STA*RT": "{#alt(shift(s))}",';
    const dictionaryEntryForMacRestartAccessKey = '"STA*RT": "{#control(option(s))}",';
    const dictionaryEntryForWinReviseAccessKey = '"SRAO*EUZ": "{#alt(shift(r))}",';
    const dictionaryEntryForMacReviseAccessKey = '"SRAO*EUZ": "{#control(option(r))}",';
    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">About Typey&nbsp;Type for Stenographers</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024 type-face--sans-serif">
          <div className="mw-568">
            <p className="mt3">Typey&nbsp;Type is a typing app designed to help <a href="#about-stenography">stenography</a> students learn{" "}
              <Tooltip
                animation="shift"
                arrow="true"
                className="abbr"
                duration="200"
                tabIndex="0"
                tag="abbr"
                theme="didoesdigital"
                title="stenography"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                steno
              </Tooltip>{" "}
              faster. You can learn briefs and improve your stenographic speed and accuracy. Lessons evolve as you progress. They have tight feedback loops so you learn to fix misstrokes immediately. You can effortlessly track progress in your brief vocabulary and rapidly increase in steno skill.</p>

            <h3 id="about-stenography">Stenography</h3>
            <p>The process of writing shorthand is called <strong>stenography</strong>. Using a stenotype machine (or a fancy keyboard) and special software, you can type over 100 or even 200 words per minute. You press keys together on a stenotype machine like playing a piano chord. The software translates the combination into meaningful words according to their phonetic sounds. Plover is the world’s first free, open-source stenography program. You can learn more about Plover from the{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Open steno project"
                aria-label="Open steno project (external link opens in new tab)"
                to="http://openstenoproject.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open steno <span className="nowrap">project
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.
            </p>

            <h4 id="steno-terms">Steno terms</h4>
            <dl className="inline-flex flex-wrap">
              <dt>Briefs</dt>
              <dd>Loosely, a brief or outline is the specified combination of keys pressed together to produce a specific word or phrase. Strictly, a brief or abbreviation is a shortened outline form with fewer strokes than the phonetic outline.</dd>
              <dt>Strokes</dt>
              <dd>A stroke is a combination of keys held together and released to write a word or sound. A multi-stroke brief is a combination of strokes pressed to produce a word or phrase (usually of more syllables).</dd>
              <dt>Misstrokes</dt>
              <dd>Misstrokes are extra entries that use similar keys to produce the word you meant to write. If you regularly mistype a word, you might add a misstroke entry for the keys you are incorrectly pressing so that your dictionaries effectively autocorrects your mistakes. For example, the misstroke <span className="steno-stroke">SPHAOEU</span> to write “supply” is missing the left-hand <span className="steno-stroke">R</span> key from the usual outline <span className="steno-stroke">SPHRAOEU</span>.</dd>
              <dt>Plover</dt>
              <dd>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Plover"
                aria-label="Plover (external link opens in new tab)"
                to="http://www.openstenoproject.org/plover/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="nowrap">Plover
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink> is the world’s first free, open-source stenography program. It works cross-platform on Windows, macOS, and Linux operating systems.</dd>
            </dl>

            <h3 id="typey-type-notes">Typey&nbsp;Type notes</h3>
            <p>Typey&nbsp;Type embraces ideas of{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="spaced repetitions"
                aria-label="spaced repetitions (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/Spaced_repetition"
                target="_blank"
                rel="noopener noreferrer"
              >
                spaced <span className="nowrap">repetitions
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink> and{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="deliberate practice"
                aria-label="deliberate practice (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/Practice_(learning_method)#Deliberate_practice"
                target="_blank"
                rel="noopener noreferrer"
              >
                deliberate <span className="nowrap">practice
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink> to teach steno effectively.</p>

            <h4 id="typey-type-progress-tracking">Typey Type progress tracking</h4>
            <p>When you “stop” a lesson before reaching the end or you complete a lesson, Typey&nbsp;Type will save <Link to="/progress">your progress</Link>. That’s when it saves all the new words you’ve successfully typed. If you leave a lesson without stopping it or finishing it, you’ll lose that lesson’s progress. Typey&nbsp;Type saves your brief progress in your browser’s local storage. You’ll lose your progress if you clear your browsing data (history, cookies, and cache). If you share this device with other people or use Typey&nbsp;Type across several devices and browsers, you should save your progress elsewhere. Copy your progress to your clipboard and save it in a text file somewhere safe. When you return, enter your progress to load it back into Typey&nbsp;Type.</p>

            <h4 id="typey-type-dictionary">Typey&nbsp;Type dictionary</h4>
            <p>Typey&nbsp;Type uses a version of the Plover dictionary that comes built into the Plover software. Typey&nbsp;Type’s version is based on a copy of Plover’s from a few years ago. <a href="https://didoesdigital.com/">DiDoesDigital</a> has since spent many hours meticulously amending it. This helps Typey&nbsp;Type suggests the best brief available. It chooses the “best” stroke by looking for the shortest stroke, where there are penalties for multi-stroke briefs and briefs that use the star (<code>*</code>) key. <a href="https://didoesdigital.com/">DiDoesDigital</a> has also removed thousands of misstrokes to hide them when learning Plover theory. There are some manual adjustments too. These show strokes that are more consistent with similar words, more consistent with Plover’s theory, phonetic, or easier to stroke.</p>
            <p><Link to="/lessons/custom">Typey&nbsp;Type custom lessons</Link> let you use your own briefs or steno theory.</p>
            <p>If you notice any odd strokes,{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="post to the feedback form"
                aria-label="post to the feedback form (external link opens in new tab)"
                to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                post to the feedback <span className="nowrap">form
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</p>

            <h4 id="typey-type-hints">Typey&nbsp;Type hints</h4>
            <p>To manually show a brief hint in a lesson that otherwise hides briefs, press <kbd>Tab</kbd> to focus on the stroke hint and <kbd>Space</kbd> activate it. This will automatically move your focus back to typing. To avoid losing time doing this, you can create a brief to press <kbd>Tab</kbd> and <kbd>Space</kbd> for you, such as <code className="tag-missing-full-stop">{dictionaryEntryForTabSpace}</code></p>

            <h4 id="typey-type-shortcuts">Typey&nbsp;Type shortcuts</h4>
            <p>
              There are some keyboard shortcuts available when you finish a lesson that make use of the browser’s built in{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="accesskey"
                aria-label="accesskey (external link opens in new tab)"
                to="https://en.m.wikipedia.org/wiki/Access_key"
                target="_blank"
                rel="noopener noreferrer"
              >
                accesskey
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
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
              </GoogleAnalytics.OutboundLink>{" "}
              functionality.</p>
            <p>To jump to the <strong className="fw7">next lesson</strong>, use the <code>accesskey</code> shortcut plus the <kbd>o</kbd> key. You can create a steno brief for the shortcut like this:</p>
            <ul>
              <li>For macOS: <code>{dictionaryEntryForMacNextLessonAccessKey}</code></li>
              <li>For everything else: <code>{dictionaryEntryForWinNextLessonAccessKey}</code></li>
            </ul>
            <p>
              To <strong className="fw7">restart a lesson</strong>, use the <code>accesskey</code> shortcut plus the <kbd>s</kbd> key. You can create a steno brief for the shortcut like this:</p>
            <ul>
              <li>For macOS: <code>{dictionaryEntryForMacRestartAccessKey}</code></li>
              <li>For everything else: <code>{dictionaryEntryForWinRestartAccessKey}</code></li>
            </ul>
            <p>To <strong className="fw7">revise selected words</strong>, use the <code>accesskey</code> shortcut plus the <kbd>r</kbd> key. You can create a steno brief for the shortcut like this:</p>
            <ul>
              <li>For macOS: <code>{dictionaryEntryForMacReviseAccessKey}</code></li>
              <li>For everything else: <code>{dictionaryEntryForWinReviseAccessKey}</code></li>
            </ul>
            <p>
              To activate accesskey shortcuts, use the browser <code>accesskey</code> shortcut plus the specific shortcut key, which is usually a letter, such as <kbd>s</kbd>. The <code>accesskey</code> shortcut for most browsers is:</p>
            <ul>
              <li><kbd>Ctrl</kbd>+<kbd>Option</kbd> on a Mac,</li>
              <li><kbd>Alt</kbd>+<kbd>Shift</kbd> on Windows and other operating systems.</li>
            </ul>

            <h4 id="typey-type-terms">Typey&nbsp;Type terms</h4>
            <dl className="inline-flex flex-wrap">
              <dt>Spacing</dt>
              <dd>Typey&nbsp;Type lets you choose where spaces should appear in a phrase for checking if you typed it correctly. Steno software can insert spaces before or after words, depending on the specific software and its settings. For example, Plover inserts spaces before words by default, and has a setting to insert spaces after words. Plover also provides extra spacing and capitalisation modes that can be set on the fly. This might suppress spaces or insert other punctuation (like dashes). A QWERTYist may feel more comfortable drilling words without any spaces, or sentences with spaces as the end.</dd>
              <dt>Seen words</dt>
              <dd>Typey&nbsp;Type tracks words you’ve "seen" or "met". Each time you successfully type a new word, that’s logged as a successful meeting.</dd>
              <dt>Words per minute (WPM)</dt>
              <dd>To track your typing speed, Typey&nbsp;Type displays the number of words you’ve typed per minute using the unit “words per minute (WPM)”. A word is considered to be 5 letters long on average. This means you might type many short words and have a higher WPM score.</dd>
              <dt>Discover</dt>
              <dd>The first type of study session lets you discover new briefs by showing only a limited number of new words while revealing their strokes. Write these words slowly, concentrating on accuracy and forming good habits around how you stroke word parts. Focus on lessons with interesting words, especially top words for your needs, such as common English words for general usage. You might also study domain specific phrases for particular industries.</dd>
              <dt>Revise</dt>
              <dd>The next type of study session helps you revise recently learned briefs by showing only words you’ve seen. Apply effort to recall these briefs before showing strokes. Avoid fingerspelling or stroking out long, phonetic forms of words so you can memorise and rehearse the best brief for every word. Choose a lesson with the majority of words you’re interested in nailing first like the top 1000 words.</dd>
              <dt>Drill</dt>
              <dd>The third type of study session is about building up your muscle memory and testing your skills. Write as fast and furiously as you can and aim for a high WPM score. Pick specific drills that focus on a certain kind of brief or many similar words so you can associate them together.</dd>
              <dt>Practice</dt>
              <dd>The final type of study session lets you mimic real usage as closely as possible. Write as fast as you can without causing misstrokes. Explore stories that use real sentences.</dd>
            </dl>

            <h4 id="flashcards" tabIndex="-1">Flashcards</h4>
            <p>Flashcards are designed for mobile devices so you can memorise steno briefs on the go. When you’re unable to recall a brief, tap “Hard” to say it was hard to remember. When you can recall a brief without hesitation, tap “Easy”. While studying flashcards, imagine which fingers and the shape of the outline you’d use to stroke a word.</p>
            <p>If it’s been a while since you’ve studied, the “threshold” will be set quite high. You’ll see flashcards you’ve studied that are below the threshold. That is, if the threshold is 12, you’ll see flashcards for words you’ve marked “Easy” less than 12 times. If you’ve marked a word as “Easy” 15 times, it won’t shown again until more time has passed.</p>
            <p>Thanks to Jim Ladd, you can also use the{" "}<GoogleAnalytics.OutboundLink
                eventLabel="Anki"
                aria-label="Anki (external link opens in new tab)"
                to="https://apps.ankiweb.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anki<span className="nowrap">
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
            </GoogleAnalytics.OutboundLink> app to memorise briefs using the{" "}<GoogleAnalytics.OutboundLink
                eventLabel="flashcard decks for the Top 2000 Words"
                aria-label="flashcard decks for the Top 2000 Words (external link opens in new tab)"
                to="https://github.com/jladdjr/anki-decks/tree/master/Plover%20-%20Project%20Gutenberg%20Top%2010k%20Words"
                target="_blank"
                rel="noopener noreferrer"
              >
                flashcard decks for the Top 2000 Words<span className="nowrap">
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
            </GoogleAnalytics.OutboundLink> from Project Gutenberg he built using Typey&nbsp;Type steno diagrams.</p>

            <h4 id="offline" tabIndex="-1">Offline</h4>
            <p>Typey&nbsp;Type does not yet officially support offline use through the website. Until then, it’s technically possible to make it work offline by running the code yourself. You can follow the steps from the <GoogleAnalytics.OutboundLink
                  eventLabel="Typey Type repo README"
                  aria-label="Typey Type repo README (external link opens in new tab)"
                  to="https://github.com/didoesdigital/typey-type/blob/master/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Typey&nbsp;Type repo <span className="nowrap">README
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
                </GoogleAnalytics.OutboundLink>.
            </p>

            <h3 id="learn-steno">Learning stenography</h3>
            <h4 id="try-steno">How can you try out steno?</h4>
            <p>For an idea of how steno feels and works, you can{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="install Plover"
                aria-label="install Plover (external link opens in new tab)"
                to="http://openstenoproject.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                install Plover<span className="nowrap">
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink> and use its “arpeggiate” setting. This setting lets you use a QWERTY keyboard to write stenography. The trick is that you press each key separately and then press space bar to send the stroke. Usually a stenographer will press all keys together and release them together. Most QWERTY keyboards, however, are non-NKRO (N-key roll over), meaning only the first 6 keys held together will be noticed; later keys are ignored. Arpeggiate will let you explore steno, but is unrealistic.</p>

            <h4 id="requirements-for-steno">What do you need to learn steno?</h4>
            <p>You need a{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="true NKRO (N-key roll over) supported keyboard"
                aria-label="true NKRO (N-key roll over) supported keyboard (external link opens in new tab)"
                to="https://github.com/openstenoproject/plover/wiki/Supported-Hardware#known-supported-keyboards"
                target="_blank"
                rel="noopener noreferrer"
              >
                true NKRO (N-key roll over) supported <span className="nowrap">keyboard
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink> with key caps or key toppers, or a{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="stenotype machine"
                aria-label="stenotype machine (external link opens in new tab)"
                to="https://github.com/openstenoproject/plover/wiki/Supported-Hardware"
                target="_blank"
                rel="noopener noreferrer"
              >
                stenotype <span className="nowrap">machine
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink> and software like{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Plover (free and open)"
                aria-label="Plover (free and open) (external link opens in new tab)"
                to="http://www.openstenoproject.org/plover/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plover (free and <span className="nowrap">open)
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</p>

            <h4 id="time-to-learn">How long does it take to learn steno?</h4>
            <p>To write text for personal use, such as writing emails and instant messages, you could learn basic steno at ~40WPM within 3–6 months. To productively use steno to write most text at under 100WPM, it might take 6–18&nbsp;months. For live dictation at 200WPM, it might take you 2&nbsp;or&nbsp;more years. If you are learning stenography for ergonomic reasons and have injuries to manage, it could take longer.</p>

            <h4 id="discovery">How many new briefs should you learn each day?</h4>
            <p>5–40.</p>
            <p>Learning new briefs is like expanding your vocabulary in a new language. One rule of thumb in learning languages is to strive for 15 new words a day, conservatively, or 25 new words a day, aggressively. For one day that might not seem like much, but after a month that’s about 500 new words.</p>

            <h4 id="revision">How many briefs should you revise each day?</h4>
            <p>100–200.</p>

            <h4 id="metronome">Why might you use the metronome?</h4>
              <p>Using a metronome might help you improve your rhythm for each stroke in finger drills. By drilling difficult transitions between pairs of strokes that slow you down or cause you hesitation using a metronome, you may improve your slowest pairs.</p>

            <h4 id="lesson-categories">What kinds of lessons are there?</h4>
            <ul>
              <li><Link to='/lessons#fundamentals'>Fundamentals</Link> let you practise the main elements of stenographic theory so you get the gist of what keys connect to what sounds and what letters or syllables they produce.</li>
              <li><Link to='/lessons#drills'>Drills</Link> are sets of common, randomly ordered words, such as names, dates, pronouns, and numbers.</li>
              <li><Link to='/lessons#collections'>Collections</Link> are sets of lessons. They might be domain-specific, such as <Link to="/lessons#tech">tech</Link> lessons, or have stenographic or linguistic significance, such as <Link to='/lessons#irreversible-binomials'>irreversible&nbsp;binomials</Link>.</li>
              <li><Link to='/lessons#stories'>Stories</Link> include any lessons with words in sentence order, such as <Link to="/lessons#virginia-woolf">Virginia Woolf stories</Link> or <Link to="/lessons#proverbial-phrases">proverbial&nbsp;phrases</Link>.</li>
            </ul>

            <h4 id="palantype">What’s a “palantype”?</h4>
            <p>Typey&nbsp;Type supports alternative steno key layouts such as “palantype”. A palantype is an alternative shorthand machine to a stenotype with more keys. That means palantype can have fewer theory conflicts and be easier to learn. Meanwhile, stenography is more popular and more ergonomic.{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="Learn palantype"
                aria-label="Learn palantype (external link opens in new tab)"
                to="http://www.openstenoproject.org/palantype/tutorial/2016/08/21/learn-palantype.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn <span className="nowrap">palantype
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink>{' '}
              and learn more about{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="Palan versus Steno"
                aria-label="Palan versus Steno (external link opens in new tab)"
                to="http://www.openstenoproject.org/palantype/palantype/2016/08/21/palan-versus-steno.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Palan versus <span className="nowrap">Steno
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink>{' '}
              from the Open Steno Project.
            </p>

            <h3 id="progress">Progress</h3>
            <p>See how much <Link to="/progress">progress you’ve made with Typey&nbsp;Type</Link>.</p>

            <h3 id="contribute">Want to contribute?</h3>
            <p>Learn how to <Link to="/contribute">contribute to Typey&nbsp;Type</Link>.</p>

            <h3 id="donate">Donate</h3>
            <p>You can support my efforts on{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Patreon"
                aria-label="Patreon (external link opens in new tab)"
                to="https://www.patreon.com/didoesdigital"
                target="_blank"
                rel="noopener noreferrer"
              >
                Patreon
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
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip>
              </GoogleAnalytics.OutboundLink>. A monthly donation helps me build more lessons and features to help you fast-track your steno progress.
            </p>

            <h3 id="code">Code on GitHub</h3>
            <p>Here’s some of the code used by Typey&nbsp;Type available on GitHub:</p>
            <ul>
              <li>
                <GoogleAnalytics.OutboundLink
                  eventLabel="Typey Type repo"
                  aria-label="Typey Type repo (external link opens in new tab)"
                  to="https://github.com/didoesdigital/typey-type"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Typey&nbsp;Type <span className="nowrap">repo
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
                </GoogleAnalytics.OutboundLink>. This contains the application code that makes Typey&nbsp;Type do useful things.
              </li>
              <li>
                <GoogleAnalytics.OutboundLink
                  eventLabel="Typey Type data repo"
                  aria-label="Typey Type data repo (external link opens in new tab)"
                  to="https://github.com/didoesdigital/typey-type-data"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Typey&nbsp;Type data repo<span className="nowrap">
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
                </GoogleAnalytics.OutboundLink>. This project is the result of automated scripts that produce lesson data used by Typey&nbsp;Type. The scripts are not included.
              </li>
              <li>
                <GoogleAnalytics.OutboundLink
                  eventLabel="Steno dictionaries repo"
                  aria-label="Steno dictionaries repo (external link opens in new tab)"
                  to="https://github.com/didoesdigital/steno-dictionaries/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Steno dictionaries<span className="nowrap">
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
                </GoogleAnalytics.OutboundLink>. This repository contains Di’s stenography dictionaries that power Typey&nbsp;Type’s stroke suggestions, as well as extra dictionaries for day-to-day steno usage.
              </li>
              <li>
                <GoogleAnalytics.OutboundLink
                  eventLabel="Stenoboard diagram SVG to React repo"
                  aria-label="Stenoboard diagram SVG to React repo (external link opens in new tab)"
                  to="https://github.com/didoesdigital/typey-type-stenoboard-diagram-svg-to-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stenoboard diagram SVG to React<span className="nowrap">
                  <Tooltip
                    title="(external link opens in new tab)"
                    className=""
                    animation="shift"
                    arrow="true"
                    duration="200"
                    tabIndex="0"
                    tag="span"
                    theme="didoesdigital"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >
                    <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
                </GoogleAnalytics.OutboundLink>. This project contains scripts used to manually convert SVG steno diagrams into React syntax to be used by the main Typey&nbsp;Type repo.
              </li>
            </ul>

            <h3 id="news">Want news?</h3>
            <p>Sign up for{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Typey Type updates and steno news"
                aria-label="Typey Type updates and steno news (external link opens in new tab)"
                to="https://didoesdigital.com/#newsletter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Typey&nbsp;Type updates and steno <span className="nowrap">news
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</p>

            <h3 id="credits">Credits</h3>
            <ul>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wikipedia provides homophones"
                aria-label="Wikipedia provides homophones (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings/Homophones"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia provides <span className="nowrap">homophones
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wikipedia provides proverbial phrases"
                aria-label="Wikipedia provides proverbial phrases (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/List_of_proverbial_phrases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia provides <span className="nowrap">proverbial phrases
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wikipedia provides proverbs"
                aria-label="Wikipedia provides proverbs (external link opens in new tab)"
                to="https://en.wiktionary.org/wiki/Appendix:English_proverbs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiktionary provides proverbs
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wikipedia provides irreversible binomials"
                aria-label="Wikipedia provides irreversible binomials (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/Irreversible_binomial"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia provides <span className="nowrap">irreversible binomials
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wikipedia provides Speech to the Troops at Tilbury"
                aria-label="Wikipedia provides Speech to the Troops at Tilbury (external link opens in new tab)"
                to="https://en.wikipedia.org/wiki/Speech_to_the_Troops_at_Tilbury"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia provides Speech to the Troops <span className="nowrap">at Tilbury
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Wiktionary provides frequency lists"
                aria-label="Wiktionary provides frequency lists (external link opens in new tab)"
                to="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiktionary provides frequency <span className="nowrap">lists
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</li>
              <li>{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Metronome sounds come from Dev_Tones by RCP Tones"
                aria-label="Metronome sounds come from Dev_Tones by RCP Tones (external link opens in new tab)"
                to="https://rcptones.com/dev_tones/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The metronome sound, “digi_plink”, comes from Dev_Tones by <span className="nowrap">RCP Tones
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink> under a{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Creative Commons license (CC BY 3.0 US)"
                aria-label="Creative Commons license (CC BY 3.0 US) (external link opens in new tab)"
                to="https://creativecommons.org/licenses/by/3.0/us/legalcode"
                target="_blank"
                rel="noopener noreferrer"
              >Creative Commons license <span className="nowrap">(CC BY 3.0 US)
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                </Tooltip></span>
              </GoogleAnalytics.OutboundLink> and was adapted to include silence at the end for a slower metronome tempo.</li>
            </ul>

            <h3 id="support">Support</h3>
            <p>For help with Typey&nbsp;Type, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a>,{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="post to the feedback form"
                aria-label="post to the feedback form (form opens in new tab)"
                to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                post to the feedback <span className="nowrap">form
                <Tooltip
                  title="(form opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>, or{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="tweet @DiDoesDigital"
                aria-label="tweet @DiDoesDigital (external link opens in new tab)"
                to="https://twitter.com/didoesdigital"
                target="_blank"
                rel="noopener noreferrer"
              >
                tweet <span className="nowrap">@DiDoesDigital
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink>.</p>

            <h3 id="privacy" tabIndex="-1">Privacy</h3>
            <p>This site uses{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Google Analytics"
                aria-label="Google Analytics (external link opens in new tab)"
                to="https://www.google.com/intl/en/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google <span className="nowrap">Analytics
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink> to track usage data for improving the site using cookies. Typey&nbsp;Type anonymises IP addresses before sending them to Google and Google Analytics retains cookie data for 26 months.</p>
            <p>This site uses{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Sentry"
                aria-label="Sentry (external link opens in new tab)"
                to="https://sentry.io/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="nowrap">Sentry
                <Tooltip
                  title="(external link opens in new tab)"
                  className=""
                  animation="shift"
                  arrow="true"
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={this.props.setAnnouncementMessage}
                >
                  <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip></span>
              </GoogleAnalytics.OutboundLink> for error reporting to improve the site.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Support;
