import React, { useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface HelpIconProps {
  helpMessage: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({ helpMessage }) => {
  const [showPopover, setShowPopover] = useState(false);

  const popover = (
    <Popover id="helpPopover">
      <Popover.Body>{helpMessage}</Popover.Body>
    </Popover>
  );

  return (
    <div className="ms-2">
      <OverlayTrigger
        trigger="hover"
        placement="top"
        show={showPopover}
        onToggle={setShowPopover}
        overlay={popover}
      >
        <FontAwesomeIcon
          icon={faQuestionCircle}
          size="sm"
          className="text-primary"
        />
      </OverlayTrigger>
    </div>
  );
};

export default HelpIcon;
