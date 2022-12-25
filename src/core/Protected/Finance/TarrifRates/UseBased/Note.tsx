import React from 'react'
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";

const Note = (props) => {

  const { t } = useTranslation();

  return (
    <div className='note-'>
      <h4 className='note-header'>{t("finance:howEPCWork")}</h4>
      <table className='note-table'>
        <thead>
          <tr>
            <th>{t("finance:unitRange")}</th>
            <th>{t("home:rate")}</th>
            <th>EPC</th>
            <th>EPC {t("finance:calculation")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{whiteSpace: "nowrap"}}>0-10</td>
            <td>125</td>
            <td>50%</td>
            <td>{t("finance:epcCal50")}</td>
          </tr>
          <tr>
            <td style={{whiteSpace: "nowrap"}}>11-15</td>
            <td>25</td>
            <td>25%</td>
            <td>{t("finance:epcCal25")}</td>
          </tr>
          <tr>
            <td style={{whiteSpace: "nowrap"}}>16-20</td>
            <td>35</td>
            <td>15%</td>
            <td>{t("finance:epcCal15")}</td>
          </tr>
          <tr>
            <td style={{whiteSpace: "nowrap"}}>21-30</td>
            <td>45</td>
            <td>10%</td>
            <td>{t("finance:epcCal10")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Note)