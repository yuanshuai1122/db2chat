// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) AutoRest Code Generator.
package ai.chat2db.server.web.api.controller.ai.fastchat.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

/**
 * The configuration information for a chat completions request. Completions support a wide variety of tasks and
 * generate text that continues from or "completes" provided prompt data.
 */
@Data
public final class FastChatCompletionsOptions {

    /*
     * The collection of context messages associated with this chat completions request.
     * Typical usage begins with a chat message for the System role that provides instructions for
     * the behavior of the assistant, followed by alternating messages between the User and
     * Assistant roles.
     */
    private List<FastChatMessage> messages;


    /*
     * A value indicating whether chat completions should be streamed for this request.
     */
    private Boolean stream;
    //
    /*
     * The model name to provide as part of this completions request.
     * Not applicable to Fast Chat AI, where deployment information should be included in the Fast Chat
     * resource URI that's connected to.
     */
    private String model;

    /**
     * Creates an instance of ChatCompletionsOptions class.
     *
     * @param messages the messages value to set.
     */
    @JsonCreator
    public FastChatCompletionsOptions(@JsonProperty(value = "messages") List<FastChatMessage> messages) {
        this.messages = messages;
    }


    /**
     * Get the stream property: A value indicating whether chat completions should be streamed for this request.
     *
     * @return the stream value.
     */
    public Boolean isStream() {
        return this.stream;
    }

    /**
     * Set the stream property: A value indicating whether chat completions should be streamed for this request.
     *
     * @param stream the stream value to set.
     * @return the ChatCompletionsOptions object itself.
     */
    public FastChatCompletionsOptions setStream(Boolean stream) {
        this.stream = stream;
        return this;
    }

    /**
     * Get the model property: The model name to provide as part of this completions request. Not applicable to Fast Chat AI,
     * where deployment information should be included in the Fast Chat AI resource URI that's connected to.
     *
     * @return the model value.
     */
    public String getModel() {
        return this.model;
    }

    /**
     * Set the model property: The model name to provide as part of this completions request. Not applicable to Fast Chat AI,
     * where deployment information should be included in the Fast Chat AI resource URI that's connected to.
     *
     * @param model the model value to set.
     * @return the ChatCompletionsOptions object itself.
     */
    public FastChatCompletionsOptions setModel(String model) {
        this.model = model;
        return this;
    }
}
