import ColorPicker from 'react-pick-color';
import "./color-selector.css"
type ColorPickerProps = {
    color: string;
    handleBackgroundColor: (color: any) => void;
    isPickerVisible: boolean;
    setPickerVisible: (value: boolean) => void;
    };

const ColorPickerPopout = ({color, handleBackgroundColor, isPickerVisible, setPickerVisible}: ColorPickerProps) => {

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setPickerVisible(!isPickerVisible)}
        className='background-color-picker-button'
      >
        Change Background Color
      </button>

      {isPickerVisible && (
        <div
          style={{
            position: 'absolute',
            top: '40px', // Adjust this value to move the picker relative to the button
            left: '0',
            zIndex: '1000',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ColorPicker
            color={color}
            onChange={color => handleBackgroundColor(color)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPickerPopout;