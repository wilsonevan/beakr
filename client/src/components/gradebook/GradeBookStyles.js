import styled from "styled-components";

export const SummaryContainer = styled.div`
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
  padding: 10px;
`;

export const HeaderSummary = styled.h3`
  width: 30%;
  text-align: left !important;
  display: inline;
  padding: 10px;
  margin: 5px;
`;

export const Split = styled.hr`
  border-color: #23a24d;
  border-top: none;
`;

export const DataSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 16;
  align-content: stretch;
  justify-content: flex-start;
`;

export const LoadingSegment = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 50%;
`

export const BottomContainer = styled.div`
  display: flex;
  align-items: stretch;
  padding: 10px;
`;

export const TableHeader = styled.h4`
  color: #455a64;
`;

export const CardHeader = styled.h3`
  color: #455a64;
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

export const ModalContainer = styled.div`
  padding: 20px;
`;

export const GradesContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;
