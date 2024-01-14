import './App.scss';
import Clock from './components/Clock';
import TooltipProvider from './components/Tooltip/TooltipProvider';

function App () {
  return (
    <TooltipProvider>
      <Clock />
    </TooltipProvider>
  );
}

export default App;
