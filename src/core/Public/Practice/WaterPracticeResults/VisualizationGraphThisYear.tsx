import GeneralChart from "components/UI/Charts/General";
import CustomCheckBox from "components/UI/CustomCheckbox";
import { getMonthByLanguage, getMonthByLanguageAndScheme, getNumberByLanguage } from "i18n/i18n";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { PracticeParametersType } from "store/modules/PracticeParameters/getPracticeParameters";
import { RootState } from "store/root-reducer";
import { chartConfig } from "./configData";

type SeriesConfig = {
  name: string;
  type: string;
  smooth: boolean;
  data: (string | number)[];
};

type ChartDataType = {
  xAxis: (string | number)[];
};

interface Props extends PropsFromRedux {
  type?: string;
  compareKey: string;
  defaultSelected: string[];
}

const LineChart = (props: Props) => {
  const [practiceParams, setPracticeParams] = useState<{
    chemical: PracticeParametersType;
    others: PracticeParametersType;
  }>();

  const [selected, setSelected] = useState<string[]>(props.defaultSelected);
  const [chartData, setChartData] = useState<ChartDataType>();

  const [seriesData, setSeriesData] = useState<SeriesConfig[]>();
  const [otherSeriesData, setOtherSeriesData] = useState<any[]>();

  // const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    if (props.practiceParams) {
      const params = {
        chemical: props.practiceParams.filter((item) => item.types === "Chemical"),
        others: props.practiceParams.filter((item) => item.types === "Other"),
      };
      setPracticeParams(params);
    }
  }, [props.practiceParams]);

  useEffect(() => {
    if (props.testResult && props.testResult[0]) {
      const newData: ChartDataType = {
        xAxis: props.testResult.map(
          (item) =>
            `${getNumberByLanguage(item["year"])} ${getMonthByLanguageAndScheme(
              item["month"],
              props.scheme?.system_date_format
            )}`
        ),
      };
      setChartData(newData);
    }
  }, [props.testResult]);

  const handleSelect = (name: string) => {
    if (selected?.includes(name)) {
      const filteredData = selected.filter((item) => item !== name);
      setSelected(filteredData);
    } else {
      setSelected([...selected, name]);
    }
  };

  useEffect(() => {
    const chemicalSeries: any = [];
    const otherCharts: any = [];

    selected.forEach((item, index) => {
      const testParam = props.practiceParams?.find((param) => param.parameter_name === item);
      if (testParam?.types === "Chemical") {
        chemicalSeries.push({
          name: testParam?.parameter_name,
          type: "line",
          smooth: true,
          data: props.testResult.map((item) => {
            return (
              item.data?.find(
                (single) => single.parameter__parameter_name === testParam?.parameter_name
              )?.total_value || 0
            );
          }),
        });
      } else {
        const newChart = Object.assign(
          {},
          {
            ...chartConfig,
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: chartData?.xAxis,
              axisLabel: {
                formatter: function (name) {
                  return name?.replace(props.type, "");
                },
              },
            },

            series: [
              {
                name: testParam?.parameter_name,
                type: "line",
                smooth: true,
                data: props.testResult.map((item) => {
                  return (
                    item.data?.find(
                      (single) => single.parameter__parameter_name === testParam?.parameter_name
                    )?.total_value || 0
                  );
                }),
              },
            ],
          }
        );
        otherCharts.push(newChart);
      }
    });

    setSeriesData(chemicalSeries);
    setOtherSeriesData(otherCharts); 

    // const selectedData = selected.map((item) => ({
    //   ...config,
    //   name: props.options.find((opt) => opt.id === item)?.name || "",
    //   data: chartData && chartData[item],
    //   itemStyle: {
    //     color: props.options.find((opt) => opt.id === item)?.color || "",
    //   },
    // }));
    // const tableData = selected.map((item) => ({
    //   name: props.options.find((opt) => opt.id === item)?.name || "",
    //   color: props.options.find((opt) => opt.id === item)?.color || "",
    //   data: chartData && chartData[item],
    // }));
    // setSeriesData(selectedData);
    // setTableData(tableData);
  }, [chartData, selected]);

  const chemicalSeriesOptionData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      show: true,
    },
    grid: {
      left: "3%",
      right: "5%",
      bottom: "3%",
      //   top: "6%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData?.xAxis,
      axisLabel: {
        formatter: function (name) {
          return name?.replace(props.type, "");
        },
      },
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };

  return (
    <div className="row">
      <div className="col-md-9">
        <GeneralChart minHeight={400} options={chemicalSeriesOptionData} />
        

        {otherSeriesData &&
          otherSeriesData.map((item) => <GeneralChart minHeight={400} options={item} />)}
      </div>
      <div className="col-md-3 chartOptions">
        <h6>Select</h6>

        <p>Chemicals</p>

        <ul>
          {practiceParams?.chemical.map((item) => (
            <li key={item.id}>
              <CustomCheckBox
                id={"" + item.id}
                label={item.parameter_name}
                onChange={(e) => handleSelect("" + item.parameter_name)}
                checked={selected.includes("" + item.parameter_name)}
              />
            </li>
          ))}
        </ul>
        <p className="mt-3">Others</p>

        <ul>
          {practiceParams?.others.map((item) => (
            <li key={item.id}>
              <CustomCheckBox
                id={"" + item.id}
                label={item.parameter_name}
                onChange={(e) => handleSelect("" + item.parameter_name)}
                checked={selected.includes("" + item.parameter_name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  language: state.i18nextData.languageType,
  practiceParams: state.testParamtersData.testParametersData.data,
  testResult: state.reportData.waterTestResultsData.data,
  scheme: state.waterSchemeData.waterSchemeDetailsData.data,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LineChart);
