import styled from 'styled-components';
import pic from '../../img/man.png';
import { utilityIcons } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

type NavigationProps = {
  active: number;
  setActive: (id: number) => void;
};

function Navigation({ active, setActive }: NavigationProps) {
  return (
    <NavStyled>
      <div className="user-con">
        <img src={pic} alt="User Man" />
        <div className="text">
          <h2>Benny</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <ul>
          <li>
            {utilityIcons.signout} Sign Out
          </li>
        </ul>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      border-bottom: 1px solid rgba(34, 34, 96, 0.1); /* Horizontal demarcation */
      padding-bottom: 0.8rem;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }

      &:last-child {
        border-bottom: none; /* Remove the border for the last item */
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    ul {
      display: flex;
      justify-content: center;

      li {
        cursor: pointer;
        font-weight: 600;
        color: rgba(34, 34, 96, 0.8);
        transition: color 0.3s ease;

        &:hover {
          color: rgba(34, 34, 96, 1);
        }
      }
    }
  }

  /* Responsive Styles */
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 0;
    padding: 1rem;

    .menu-items {
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
      position: relative;

      li {
        grid-template-columns: auto;
        padding: 0;
        text-align: center;
        border-bottom: none; /* Remove borders for horizontal layout */

        /* Add vertical line as a separator */
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: -0.5rem;
          height: 100%;
          width: 1px;
          background-color: rgba(34, 34, 96, 0.1);
        }

        &:last-child::after {
          content: none; /* Remove the vertical line from the last item */
        }
      }
    }

    .user-con {
      display: none; /* Hide user section on smaller screens */
    }
  }

  @media screen and (max-width: 480px) {
    ul {
      flex-direction: column;
      align-items: center;

      li {
        margin: 0.5rem 0;
        border-bottom: 1px solid rgba(34, 34, 96, 0.1); /* Keep borders for vertical stack */
        &::after {
          content: none; /* No vertical line in vertical stack */
        }
      }
    }
  }
`;

export default Navigation