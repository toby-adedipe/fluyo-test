import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/colors';

interface OptionButtonProps {
  options: string[];
  selectedOption: string;
  onSelectOption(option: string): void;
}

interface ButtonProps {
  option: string;
  isSelected: boolean;
  onSelectOption(option: string): void;
}

const OptionButton = ({ 
  option, 
  isSelected, 
  onSelectOption 
}: ButtonProps) => {
  const buttonStyle = isSelected ? styles.selectedBtn : styles.selectionBtn;
  const textStyle = isSelected ? styles.selectedOption : styles.option;

  return (
    <TouchableOpacity style={buttonStyle} onPress={() => onSelectOption(option)}>
      <Text style={textStyle}>{option}</Text>
    </TouchableOpacity>
  );
};

// OptionButtons component that shows all the OptionButtons
export default function OptionButtons({ 
  options, 
  selectedOption,
  onSelectOption, 
}: OptionButtonProps) {
  return (
    <View style={styles.optionsContainer}>
      {options.map((option) => (
        <OptionButton
          key={option}
          option={option}
          isSelected={selectedOption.length > 0 && selectedOption === option}
          onSelectOption={()=> onSelectOption(option)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    gap: 16,
    justifyContent: 'center',
  },
  selectedOption: {
    opacity: 0,
  },
  option: {
    opacity: 1,
  },
  selectionBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  selectedBtn: {
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});