import { gql } from "@apollo/client";


export const SEND_TEXT = gql`
mutation sendText(text: String!) {
    text
}`

