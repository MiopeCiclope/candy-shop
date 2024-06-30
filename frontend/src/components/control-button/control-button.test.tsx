import { fireEvent, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { render } from "../../utils/test-utils";
import ControlButton from "./control-button";

describe('Control Button Component', () => {
  const params = {
    onClick: jest.fn(),
    isActive: false,
    text: "Mock button"
  }

  test('renders the ControlButton with correct text', async () => {
    render(<ControlButton {...params} />);

    expect(screen.getByText(/Mock button/i)).toBeInTheDocument();
  });

  test('button color is success when isActive is false', () => {
    render(<ControlButton {...params} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButton-containedSuccess');
  });

  test('button color is warning when isActive is true', () => {
    params.isActive = true
    render(<ControlButton {...params} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButton-containedWarning');
  });

  test('calls onClick handler when clicked', () => {
    render(<ControlButton {...params} />);

    const buttonElement = screen.getByText(/Mock button/i);
    fireEvent.click(buttonElement);
    expect(params.onClick).toHaveBeenCalledTimes(1);
  });
});
