
package entity;

public class Tag {
    private final int tagID;
    private final String tagName;
    private final String tagCategory;

    public Tag(int tagID, String tagName, String tagCategory) {
        this.tagID = tagID;
        this.tagName = tagName;
        this.tagCategory = tagCategory;
    }
    public int getTagID()
    {
        return tagID;
    }

    public String getTagName()
    {
        return tagName;
    }

    public String getTagCategory()
    {
        return tagCategory;
    }
}
