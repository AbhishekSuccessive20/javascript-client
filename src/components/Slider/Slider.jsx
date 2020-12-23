import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import center from './style';

class Slider extends Component {
  id

  constructor(props) {
    super(props);
    this.state = {
      bannerNo: 0,
      defaultBannerImage: 'default.png',
      altText: props.altText,
      duration: props.duration,
      height: props.height,
      source: PUBLIC_IMAGE_FOLDER + DEFAULT_BANNER_IMAGE,
    };
  }

  componentDidMount() {
    const { duration, defaultBannerImage } = this.state;
    const { random, banner, defaultBanner } = this.props;
    const timeDuration = duration;
    if (banner.length === 0 && defaultBanner === defaultBannerImage) {
      this.id = setInterval(timeDuration);
    } else if (banner.length === 0) {
      this.id = setInterval(() => {
        this.setState({
          source: `${PUBLIC_IMAGE_FOLDER}/banners/${defaultBanner}`,
        });
      });
    } else {
      this.id = setInterval(() => {
        const { bannerNo } = this.state;
        const currentBanner = bannerNo;
        const nextBanner = random
          ? getRandomNumber(4) : getNextRoundRobin(currentBanner, 5);
        this.setState({
          bannerNo: nextBanner,
          source: PUBLIC_IMAGE_FOLDER + banner[nextBanner],
        });
      }, timeDuration);
    }
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { source, altText, height } = this.state;
    return (
      <img src={source} alt={altText} height={height} style={center} />
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
  banner: PropTypes.arrayOf(PropTypes.string),
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: 'default.png',
  duration: 2000,
  height: 200,
  random: false,
  banner: [],
};

export default Slider;
