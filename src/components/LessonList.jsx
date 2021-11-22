import React from "react";
import { Link } from "react-router-dom";
import { groups } from "d3-array";

const WordCount = ({ lesson }) =>
  lesson?.wordCount > 0 && ` · ${lesson.wordCount} words`;
const LessonLink = ({ lesson, url }) => (
  <Link
    to={`${url}${lesson.path}`
      .replace(/lesson\.txt$/, "")
      .replace(/\/{2,}/g, "/")}
    id={
      "ga--lesson-index-" +
      lesson.path.replace(/\/lesson\.txt/g, "").replace(/[/.]/g, "-")
    }
  >
    {lesson.title}
    {lesson.subtitle?.length > 0 && `: ${lesson.subtitle}`}
  </Link>
);
const InnerLessonList = ({ lessons, url }) => (
  <ul className="unstyled-list">
    {lessons.map((lesson) => (
      <li className="unstyled-list-item mb1" key={lesson.path}>
        <LessonLink lesson={lesson} url={url} />
        <WordCount lesson={lesson} />
      </li>
    ))}
  </ul>
);

export default function LessonList({ lessonIndex, url }) {
  const groupedLessons = groups(
    lessonIndex,
    (d) => d.category,
    (d) => d.subcategory
  );
  return (
    <div>
      <p className="mb0">Jump to:</p>
      <ul>
        {groupedLessons.map(([category, subcategories]) => (
          <li key={category}>
            <a href={`#${category.toLowerCase()}`}>{category}</a>
            {subcategories[0][0] &&
              <ul>
              {subcategories.map(([subcategory, _]) => (
                <li key={subcategory}><a href={`#${subcategory.toLowerCase()}`}>{subcategory}</a></li>
              ))}
              </ul>
            }
          </li>
        ))}
      </ul>
      {groupedLessons.map(([category, subcategories]) => {
        return (
          <div key={category}>
            <a
              href={`#${category.toLowerCase()}`}
              id={category.toLowerCase()}
              className="heading-link--content"
            >
              <h4 className="h3">{category}</h4>
            </a>
            {subcategories.map(([subcategory, lessons]) => {
              if (subcategory) {
                return (
                  <div key={subcategory}>
                    <a
                      href={`#${subcategory.toLowerCase()}`}
                      id={subcategory.toLowerCase()}
                      className="heading-link--content"
                    >
                      <h5 className="h4">{subcategory}</h5>
                    </a>
                    <InnerLessonList lessons={lessons} url={url} />
                  </div>
                );
              } else {
                return (
                  <div key={subcategory}>
                    <InnerLessonList lessons={lessons} url={url} />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
