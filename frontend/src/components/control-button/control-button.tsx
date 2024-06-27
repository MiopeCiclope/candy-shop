import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled"
import { Button } from "@mui/material"

const ButtonWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  width: 200px;
`

interface ControlButtonProps {
  className?: SerializedStyles;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
  text: string;
}

const ControlButton = (props: ControlButtonProps) => {
  const { className, onClick, isActive, text } = props
  const getColor = (isActive: boolean) => isActive ? "warning" : "success"

  return (
    <ButtonWrapper>
      <StyledButton variant="contained" onClick={onClick} color={getColor(isActive)} className={className?.name}>
        {text}
      </StyledButton>
    </ButtonWrapper>

  )
}

export default ControlButton
