import styled from 'styled-components'

export const SongsItemWrapper = styled.div`
  width: 140px;
  margin: 15px 0;

  .top {
    position: relative;

    & > img {
      width: 140px;
      height: 140px;
    }
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 0;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: 0 -537px;
        color: #ccc;
        height: 27px;

        .headset {
          margin-right: 5px;
          display: inline-block;
          width: 14px;
          height: 14px;
          background-position: 0 -21px;
        }

        .play {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-position: 0 0;
        }
      }
    }
  }

  .bottom {
    font-size: 14px;
    color: #000;
    margin-top: 5px;
  }
`
