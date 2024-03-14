import colors from '../utils/colors';
import React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FileSelector from './FileSelector';
import BasicModalContainer from '../ui/BasicModalContainer';

interface Props<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

const CategorySelector = <T extends any>({
  data,
  title,
  visible = false,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => handleSelect(item, index)}
              key={index}
              style={styles.selectorContainer}>
              {selectedIndex === index ? (
                // <FileSelector icon="radio-on" />
                <TouchableOpacity>
                  <Image
                    source={require('../ui/assets/radio-on.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              ) : (
                // <FileSelector icon="radio-off" />
                <TouchableOpacity>
                  <Image
                    source={require('../ui/assets/radio-off.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              )}
              {renderItem(item)}
            </Pressable>
          );
        })}
      </ScrollView>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#B5D9FF',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#045AB4',
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelector;
