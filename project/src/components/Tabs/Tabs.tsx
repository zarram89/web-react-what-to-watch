import { useState } from 'react';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import TabOverview from './TabOverview';
import TabDetails from './TabDetails';
import TabReviews from './TabReviews';

type TabsProps = {
  film: Film;
  reviews: Review[];
};

enum TabType {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

function Tabs({ film, reviews }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Overview);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.Overview:
        return <TabOverview film={film} />;
      case TabType.Details:
        return <TabDetails film={film} />;
      case TabType.Reviews:
        return <TabReviews reviews={reviews} />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === TabType.Overview ? 'film-nav__item--active' : ''}`}>
            <button
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Overview);
              }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Overview
            </button>
          </li>
          <li className={`film-nav__item ${activeTab === TabType.Details ? 'film-nav__item--active' : ''}`}>
            <button
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Details);
              }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Details
            </button>
          </li>
          <li className={`film-nav__item ${activeTab === TabType.Reviews ? 'film-nav__item--active' : ''}`}>
            <button
              className="film-nav__link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(TabType.Reviews);
              }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Reviews
            </button>
          </li>
        </ul>
      </nav>

      {renderTabContent()}
    </>
  );
}

export default Tabs;
