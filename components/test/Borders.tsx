const renderBorders = () => {
  return (
    <>
      <View style={styles.borderLeft} />
      <View style={styles.borderRight} />
      <View style={styles.borderTop} />
      <View style={styles.borderBottom} />
    </>
  );
};

const styles = StyleSheet.create({
  borderLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
  borderBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
  },
});