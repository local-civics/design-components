import React from "react";
import LinkifyIt    from "linkify-it";
import reactStringReplace from "react-string-replace"

export const linkify = (text: string) => {
    const matches = LinkifyIt().match(text)
    let replacedText = reactStringReplace(text)
    matches?.forEach(match => {
        replacedText = reactStringReplace(replacedText, match.raw, () => <a
            href={match.url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-blue-500"
        >{match.text}</a>)
    })

    return replacedText
}