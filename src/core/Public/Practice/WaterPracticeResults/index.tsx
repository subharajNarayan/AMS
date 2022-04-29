import classnames from 'classnames';
import { GeneralCard } from 'components/UI/GeneralCard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Nav, NavItem, NavLink } from 'reactstrap';

const WaterPracticeResults = () => {

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if(activeTab != tab) setActiveTab(tab)
  }

  return (
    <div className='container py-3 cash-book'>
      <GeneralCard title={t("sidebar:qualityTestResult")} print={true}>
        <div className='cash-content'>
          <div className='flex-between'>
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active : activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}>
                  {t("home:allTime")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active : activeTab === "2" })}
                onClick = {() => {
                  toggle("2")
                }}>
                  {t("home:thisYear")}
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
      </GeneralCard>
    </div>
  )
}

export default WaterPracticeResults;