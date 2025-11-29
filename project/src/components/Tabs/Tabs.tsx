import { useState } from 'react';
import { Film } from '../../types/film';
import TabOverview from './TabOverview';
import TabDetails from './TabDetails';
import TabReviews from './TabReviews';

type TabsProps = {
    film: Film;
};

enum TabType {
    Overview = 'Overview',
    Details = 'Details',
    Reviews = 'Reviews',
}

function Tabs({ film }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Overview);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.Overview:
        return <TabOverview film={film} />;
      case TabType.Details:
        return <TabDetails film={film} />;
      case TabType.Reviews:
        return <TabReviews />;
      default:
        return <TabOverview film={film} />;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === TabType.Overview ? 'film-nav__item--active' : ''}`}>
            <a
              href="#"
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Overview);
              }}
            >
                            Overview
            </a>
          </li>
          <li className={`film-nav__item ${activeTab === TabType.Details ? 'film-nav__item--active' : ''}`}>
            <a
              href="#"
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Details);
              }}
            >
                            Details
            </a>
          </li>
          <li className={`film-nav__item ${activeTab === TabType.Reviews ? 'film-nav__item--active' : ''}`}>
            <a
              href="#"
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Reviews);
              }}
            >
                            Reviews
            </a>
          </li>
        </ul>
      </nav>

      {renderTabContent()}
    </>
  );
}

export default Tabs;
