import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import ClassicTheme from '../theme/ClassicTheme';

export default function registerInterfaceWithClassicTheme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(ClassicTheme);
}
