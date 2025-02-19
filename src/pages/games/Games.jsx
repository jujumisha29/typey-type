import React from "react";
import { Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loadable from "react-loadable";
import PageLoading from "../../components/PageLoading";

const AsyncGamesIndex = Loadable({
  loader: () => import("./GamesIndex"),
  loading: PageLoading,
  delay: 300,
});

const AsyncKAOES = Loadable({
  loader: () => import("./KAOES/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncKHAERT = Loadable({
  loader: () => import("./KHAERT/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncSHUFL = Loadable({
  loader: () => import("./SHUFL/Index"),
  loading: PageLoading,
  delay: 300,
});

const AsyncTPEUBGSZ = Loadable({
  loader: () => import("./TPEUBGSZ/Index"),
  loading: PageLoading,
  delay: 300,
});

const Games = ({
  match,
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  startingMetWordsToday,
  updateMetWords,
}) => {
  return (
    <Switch>
      <Route
        exact={true}
        path={`${match.url}/KAOES`}
        render={() => (
          <DocumentTitle title={"Typey Type | KAOES game"}>
            <ErrorBoundary>
              <AsyncKAOES />
            </ErrorBoundary>
          </DocumentTitle>
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/KHAERT`}
        render={() => (
          <DocumentTitle title={"Typey Type | KHAERT"}>
            <ErrorBoundary>
              <AsyncKHAERT
                fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
                globalLookupDictionary={globalLookupDictionary}
                personalDictionaries={personalDictionaries}
              />
            </ErrorBoundary>
          </DocumentTitle>
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/SHUFL`}
        render={() => (
          <DocumentTitle title={"Typey Type | SHUFL game"}>
            <ErrorBoundary>
              <AsyncSHUFL
                fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                personalDictionaries={personalDictionaries}
                startingMetWordsToday={startingMetWordsToday}
                updateMetWords={updateMetWords}
              />
            </ErrorBoundary>
          </DocumentTitle>
        )}
      />
      <Route
        exact={true}
        path={`${match.url}/TPEUBGSZ`}
        render={() => (
          <DocumentTitle title={"Typey Type | TPEUBGSZ game"}>
            <ErrorBoundary>
              <AsyncTPEUBGSZ startingMetWordsToday={startingMetWordsToday} />
            </ErrorBoundary>
          </DocumentTitle>
        )}
      />
      <Route
        exact={true}
        path={`${match.url}`}
        render={() => <AsyncGamesIndex />}
      />
    </Switch>
  );
};

export default Games;
