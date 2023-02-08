import GeneralChart from "components/UI/Charts/General";
import CustomCheckBox from "components/UI/CustomCheckbox";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { TestParametersType } from "store/modules/testParamters/getTestParameters";
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
  const [testParams, setTestParams] = useState<{
    chemical: TestParametersType;
    physical: TestParametersType;
    others: TestParametersType;
  }>();

  const { t } = useTranslation();

  const [selected, setSelected] = useState<number[]>([]);
  const [chartData, setChartData] = useState<ChartDataType>();

  const [seriesData, setSeriesData] = useState<SeriesConfig[]>();
  const [otherSeriesData, setOtherSeriesData] = useState<any[]>();
  

  // const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    if (props.testParams) {
      const params = {
        chemical: props.testParams.filter((item) => item.types === "Chemical"),
        physical: props.testParams.filter((item) => item.types === "Physical"),
        others: props.testParams.filter((item) => item.types === "Others"),
      };
      setTestParams(params);
    }
  }, [props.testParams]);

  useEffect(() => {
    if (props.testResult && props.testResult[0]) {
      const newData: ChartDataType = {
        xAxis: props.testResult.map((item) => `${props.type} ${item[props.compareKey]}`),
      };
      setChartData(newData);
    }
  }, [props.testResult]);

  const handleSelect = (id: number) => {
    if (selected?.includes(id)) {
      const filteredData = selected.filter((item) => item !== id);
      setSelected(filteredData);
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    const chemicalSeries: any = [];
    const physicalSeries: any = [];
    const otherCharts: any = [];

    selected.forEach((item, index) => {
      const testParam = props.testParams?.find((param) => param.id === item);
      if (testParam?.types === "Chemical") {
        chemicalSeries.push({
          name: testParam?.parameter_name + ` ( ${testParam?.unit} ) (${t("home:standard")} ${testParam?.NDWQS_standard}) `,
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
      } 
      // else if(testParam?.types === "Physical") {
      //   physicalSeries.push({
      //     name: testParam?.parameter_name,
      //     type: "line",
      //     smooth: true,
      //     data: props.testResult.map((item) => {
      //       return (
      //         item.data?.find(
      //           (single) => single.parameter__parameter_name === testParam?.parameter_name
      //         )?.total_value || 0
      //       );
      //     }),
      //   });
      // }
       else {
        const newChart = Object.assign(
          {},
          {
            ...chartConfig,
            legend: {
              show: true,
              bottom: 0,
              testParam: {
                color:"red"
              }
            },
            grid: {
              left: "3%",
              right: "5%",
              bottom: "10%",
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

            series: [
              {
                name: testParam?.parameter_name + ` ( ${testParam?.unit} ) (Standard ${testParam?.NDWQS_standard}) `,
                type: "line",
                smooth: true,
                data: props.testResult?.map((item) => {
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
    setOtherSeriesData(physicalSeries);
    setOtherSeriesData(otherCharts);

    console.log(otherCharts, "**********chemicalSeries");

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
      bottom: 0,

    },
    grid: {
      left: "3%",
      right: "5%",
      bottom: "10%",
      //   top: "6%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData?.xAxis,
      axisLabel: {
        formatter: function (name) {
          return name?.replace(props.type, "","fsdfs");
        },
        
      },
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };

  console.log(chartData, "seeeflleede");

  return (
    <div className="row">
      <div className="col-md-9">
        <GeneralChart minHeight={400} options={chemicalSeriesOptionData} />

        {otherSeriesData &&
          otherSeriesData.map((item) => (
            <div className="mt-3">
              {" "}
              <GeneralChart minHeight={400} options={item} />{" "}
            </div>
          ))}
        {/* {tableData?.length > 0 && props.type && (
          <DataTable
            years={chartData?.xAxis}
            tableData={tableData}
            type={props.type}
          />
        )} */}
      </div>
      <div className="col-md-3 chartOptions">
        <h6>Select</h6>

        <p>Chemicals</p>

        <ul>
          {testParams?.chemical.map((item) => (
            <li key={item.id}>
              <CustomCheckBox
                id={"" + item.id}
                label={item.parameter_name}
                onChange={(e) => handleSelect( item.id)}
                checked={selected.includes( item.id)}
              />
            </li>
          ))}
        </ul>

        <p>Physical</p>

        <ul>
          {testParams?.physical.map((item) => (
            <li key={item.id}>
              <CustomCheckBox
                id={"" + item.id}
                label={item.parameter_name}
                onChange={(e) => handleSelect( item.id)}
                checked={selected.includes( item.id)}
              />
            </li>
          ))}
        </ul>
        <p className="mt-3">Others</p>

        <ul>
          {testParams?.others.map((item) => (
            <li key={item.id}>
              <CustomCheckBox
                id={"" + item.id}
                label={item.parameter_name}
                onChange={(e) => handleSelect(item.id)}
                checked={selected.includes(item.id)}
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
  testParams: state.testParamtersData.testParametersData.data,
  testResult: state.reportData.waterTestResultsData.data,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LineChart);
