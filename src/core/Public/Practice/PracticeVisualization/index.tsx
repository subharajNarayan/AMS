import React from "react";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
// import NepaliDatePicker from "components/React/Datepicker/Datepicker";
// import { ADToBS, BSToAD } from "components/React/Datepicker/Datepickerutils";
// import EnglishDatePicker from "components/React/EnglishDatepicker/EnglishDatepicker";
// import StyledSelect from "components/React/StyledSelect/StyledSelect";
import { GeneralCard } from "components/UI/GeneralCard";
// import { connect, ConnectedProps } from "react-redux";
// import { getWaterSupplyReportAction } from "store/modules/report/waterSupply";
// import { getSchemeYearIntervalsAction } from "store/modules/waterScheme/getYearIntervals";
// import { RootState } from "store/root-reducer";
// import { allTimeOptions, thisYearOptions, thisMonthOptions, thisWeekOptions } from "./datas";
// import VisualizationBarGraph from "./VisualizationBarGraph";
// import VisualizationBarGraphThisWeek from "./VisualizationBarGraphThisWeek";
// import VisualizationGraph from "./VisualizationGraph";
// import VisualizationGraphThisYear from "./VisualizationGraphThisYear";
// import formatDate, { getDefaultDate } from "utils/utilsFunction/date-converter";


const PracticeVisualization = () => {

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = React.useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className='container py-3 cash-book customCase'>
            <GeneralCard title={t("sidebar:practicevisualization")} print={true}>
                <div className='cash-content'>
                    <div className='flex-between'>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === "1" })}
                                    onClick={() => {
                                        toggle("1")
                                    }}
                                    >
                                    {t("home:allTime")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === "2" })}
                                    onClick={() => {
                                        toggle("2")
                                    }}
                                >
                                    {t("home:thisYear")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === "3" })}
                                    onClick={() => {
                                        toggle("3")
                                    }}
                                >
                                    {t("home:thisMonth")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === "4" })}
                                    onClick={() => {
                                        toggle("4")
                                    }}
                                >
                                    {t("home:thisWeek")}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
            </GeneralCard>
        </div>
    )
}

export default PracticeVisualization;