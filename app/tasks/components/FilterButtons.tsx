import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <View style={styles.filterContainer}>
      <Button title="Todas" onPress={() => setFilter('Todas')} />
      <Button title="Completas" onPress={() => setFilter('Completas')} />
      <Button title="Incompletas" onPress={() => setFilter('Incompletas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default FilterButtons;
