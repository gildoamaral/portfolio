import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];



const Header = () => {
  const [prevState, setPrevState] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const refBox = useRef();

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };  



  useEffect(() => {
    const handleScroll = () => {
      const currentState = window.scrollY;
      const isVisible = prevState > currentState || currentState < 200;

      setVisible(isVisible);
      setPrevState(currentState);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevState]);

  return (
    <Box
      ref={refBox}
      position="fixed"
      top={0}
      left={0}
      right={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      transform={`translateY(${visible ? '0' : '-200px'})`}
      backgroundColor="#18181b"
      zIndex={999}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={7}>
              {socials.map(element => {
                return (<Link href={element.url} key={element.url}>
                  <FontAwesomeIcon icon={element.icon} size="xl"/>
                </Link>)
              })}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <Link href="/#contact-me" onClick={handleClick("contactme")}>Contact Me</Link>
              <Link href="/#projects" onClick={handleClick("projects")}>Projects</Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
