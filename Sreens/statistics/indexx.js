import { View, Text, Dimensions, Button } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";

export const StatsPage = () => {
  return (
    <View>
      <Text>Stats</Text>
      <LineChart
        data={{
          labels: ["1st week", "2nd week", "3rd week", "4th week"],
          datasets: [
            {
              data: [4, 10, 16, 32],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
      />
      <ProgressChart
        data={{
          labels: ["Vegetables", "Fruits", "Meat", "Diary"],
          data: [0.2, 0.4, 0.1, 0.3],
        }}
        width={Dimensions.get("window").width}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: "#08c25e",
          backgroundGradientFrom: "#08c25e",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `#000`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        hideLegend={false}
      />
      {/* <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Account")}
      /> */}
    </View>
  );
};
