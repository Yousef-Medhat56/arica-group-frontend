import React from 'react'
import { Image } from '@chakra-ui/react'
export default function FlowersPattern() {
  return (
    <div>
      <Image
                    src={"./images/flowers-pattern.svg"}
                    alt="flowers"
                    pos={"absolute"}
                    top={"40px"}
                    maxWidth={"400px"}
                    right={{ base: 0, xl: 200 }}
                    display={{ base: "none", md: "block" }}
                />
                <Image
                    src={"./images/flowers-pattern.svg"}
                    alt="flowers"
                    pos={"absolute"}
                    bottom={"250px"}
                    maxWidth={"400px"}
                    left={{ base: 0, xl: 200 }}
                    display={{ base: "none", md: "block" }}
                    style={{ rotate: "180deg" }}
                />
    </div>
  )
}
