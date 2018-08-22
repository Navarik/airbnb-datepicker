import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import Bootstrap4Theme from '../theme/Bootstrap4Theme';

export default function registerInterfaceWithBootstrap4Theme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(Bootstrap4Theme);
}
