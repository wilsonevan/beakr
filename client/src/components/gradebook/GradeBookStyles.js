import styled from 'styled-components';

export const SummaryContainer = styled.div`
  // background-color: #23a24d;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #23a24d;
  border-radius: 5px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  // align-items: stretch;
  padding: 10px;
`;

export const GradesContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const HeaderSummary = styled.h3`
  width: 30%;
  text-align: left !important;
  // display: flex;
  display: inline;
  // flex-grow: none;
  // justify-content: flex-end;
  padding: 10px;
  margin: 5px;
  // color: white !important;
`;

export const Split = styled.hr`
  border-color: #23a24d;
  border-top: none;
`;

export const DataSummary = styled.div`
  // text-align: left !important;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 16;
  align-content: stretch;
  justify-content: flex-start;
  // padding: 10px;
`;

export const BottomContainer = styled.div`
  display: flex;
  // justify-content: flex-start;
  align-items: stretch;
  padding: 10px;
`;

export const TableHeader = styled.h4`
  color: #455A64;
`;

export const CardHeader = styled.h3`
  color: #455A64;

`;

export const ChartContainer = styled.div`
  padding: 5px;
  padding-top: 20px;
`;

export const chartColors = [
  "#23a24d",
  "#2979ff",
  "#f99b52",
  "#f26060",
  "#75efe3",
  "#e876a1"
];