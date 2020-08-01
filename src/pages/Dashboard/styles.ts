import styled from 'styled-components';

export const Content = styled.div`
  background: #fff;
  min-height: 400px;
  border-radius: 8px;
  margin-top: 20px;

  padding: 20px;

  section {
    margin-top: 40px;

    h2 {
      margin-bottom: 10px;
    }
  }

  ul {
    list-style: none;
  }
`;

export const Business = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BusinessInfo = styled.div`
  display: flex;

  img {
    border-radius: 50%;
    width: 90px;
    height: 90px;
  }

  div {
    display: flex;
    flex-direction: column;

    margin-left: 10px;
    strong {
      margin-bottom: 5px;
    }

    span {
    }
  }
`;

export const CanHelpContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(120px, 200px));
  grid-gap: 32px;
`;

export const CanHelpCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 8px;

  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  svg {
  }

  strong {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  span {
  }

  a {
  }

  button {
    padding: 4px;
    border-radius: 4px;
    background: #63bbc5;
    border: none;
    color: white;
    margin-top: 8px;
  }
`;
