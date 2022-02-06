import { ResponsivePie, PieSvgProps } from '@nivo/pie';
import './styles.scss';

type Data = {
  id: string | number;
  label: string;
  value: number;
  color?: string;
};
type Props = {
  data: Data[];
};

function PieChart(props: Props) {
  const total = props.data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="pie-chart-wrapper">
      <ResponsivePie
        data={props.data}
        innerRadius={0.5}
        padAngle={5}
        cornerRadius={3}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat={(val) => `${((val / total) * 100).toFixed(2)} %`}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
      />
    </div>
  );
}

export default PieChart;
