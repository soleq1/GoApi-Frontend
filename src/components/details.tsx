import React from "react"
type DetailProps = {
    input: string[]
}
export const Details:React.FC<DetailProps> = ({input}) =>{


    return(

        <div className="bg-gray-800 text-white mt-4 p-4 rounded-md font-mono text-sm mb-4">
        <div className="flex justify-center">
          <details className="w-full">
            <summary className="cursor-pointer">API Details</summary>
            <div className="bg-gray-700 p-4 rounded-md mt-2 whitespace-pre-wrap">
              <ul className="list-disc pl-5">
                {input.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>

    )
}