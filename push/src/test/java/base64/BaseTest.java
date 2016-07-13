package base64;

import org.apache.commons.codec.binary.Base64;

public class BaseTest {

	public static String getBase64(String s){
		return null;
		
	}
	
	public static String encodeBase64(byte[] input) {
		return new String(Base64.encodeBase64(input));
	}
	
	//将字符串转换成二进制字符串，以空格相隔
    private static String StrToBinstr(String str) {
        char[] strChar=str.toCharArray();
        String result="";
        for(int i=0;i<strChar.length;i++){
            result +=Integer.toBinaryString(strChar[i])+ " ";
        }
        return result;
    }
	
    
	public static void main(String args[]){
		System.out.println("base 64 test");
		Base64 base64 = new Base64();
		StringBuffer sBuffer = new StringBuffer();
		sBuffer.append("Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a ")
			   .append("perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.")
			   ;
        String str = sBuffer.toString();
        byte[] enbytes = null;
        String encodeStr = null;
        byte[] debytes = null;
        String decodeStr = null;

        enbytes = base64.encode(str.getBytes());
        encodeStr = new String(enbytes);
        debytes = base64.decode(enbytes);
        decodeStr = new String(debytes);
    
        System.out.println("编码前:" + str);
        System.out.println("编码后:" + encodeStr);
        System.out.println("解码后:" + decodeStr);
        
        //字符串二进制表示
        String ok  = StrToBinstr(str);
        System.out.println(ok);
        //ascii表示
	}
	
}
