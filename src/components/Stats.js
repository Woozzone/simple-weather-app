import React from 'react';
import styled from 'styled-components';

const StatsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StatsItem = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: 'Work Sans', cursive;
  font-size: 16px;
  padding: 0 15px;
`;

const I = styled.i`
  font-size: 24px;
  margin-right: 10px;
  color: #fff;
`;

const Stats = props => {
  return (
    <StatsWrapper>
      <StatsItem>
        <I className="wi wi-raindrop" /> {`${props.humidity}%`}
      </StatsItem>
      <StatsItem>
        <I className="wi wi-strong-wind" /> {`${props.windSpeed} m/s`}
      </StatsItem>
    </StatsWrapper>
  );
};

export default Stats;
